
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Model;
using OrderService.Model.DTO;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ProductService.Model.DTO;
namespace OrderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;
        private readonly string _productServiceUrl = "http://localhost:5241"; 

        public OrderController(AppDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        // Fetch all orders with product data
        [HttpGet]
        public async Task<ActionResult<List<object>>> GetOrders()
        {
            var orders = await _context.Orders.ToListAsync();
            var result = new List<object>();

            foreach (var order in orders)
            {
                var product = await GetProductById(order.ProductId);

                if (product == null)
                {
                    return NotFound($"Product with ID {order.ProductId} not found.");
                }

                var orderData = new
                {
                    order.Id,
                    order.CustomerName,
                    order.ProductId,
                    Product = product, // Return product data
                    order.Quantity,
                    order.TotalPrice,
                    order.OrderDate
                };

                result.Add(orderData);
            }

            return Ok(result);
        }

        // Create a new request
        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(OrderDto orderDto)
        {
            var product = await GetProductById(orderDto.ProductId);
            if (product == null)
            {
                return BadRequest("Product not found in ProductService.");
            }

            var order = new Order
            {
                CustomerName = orderDto.CustomerName,
                ProductId = product.Id,
                Quantity = orderDto.Quantity,
                TotalPrice = product.Price * orderDto.Quantity,
                OrderDate = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, orderDto);
        }

        // Update order
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, OrderDto orderDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            var product = await GetProductById(orderDto.ProductId);
            if (product == null)
            {
                return BadRequest("Invalid Product ID.");
            }

            order.CustomerName = orderDto.CustomerName;
            order.ProductId = product.Id;
            order.Quantity = orderDto.Quantity;
            order.TotalPrice = product.Price * orderDto.Quantity;
            order.OrderDate = DateTime.UtcNow;

            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete request
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Fetch product data from `ProductService`
        private async Task<ProductDto> GetProductById(int productId)
        {
            var response = await _httpClient.GetAsync($"{_productServiceUrl}/api/product/{productId}");
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ProductDto>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
    }
}



