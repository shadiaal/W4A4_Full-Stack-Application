using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductService.Data;
using ProductService.Model;
using ProductService.Model.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;
        private readonly string _externalApiUrl = "https://fakestoreapi.com/products";

        public ProductController(AppDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        // Fetch all products
        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            if (!products.Any())
            {
                var response = await _httpClient.GetAsync(_externalApiUrl);
                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Failed to fetch products from external API");
                }

                var json = await response.Content.ReadAsStringAsync();
                if (string.IsNullOrEmpty(json))
                {
                    return BadRequest("Received empty response from external API");
                }

                try
                {
                    var externalProducts = JsonSerializer.Deserialize<List<Product>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    if (externalProducts != null)
                    {
                        foreach (var product in externalProducts)
                        {
                            if (string.IsNullOrEmpty(product.Name))
                            {
                                product.Name = "Unnamed Product";
                            }
                        }

                        _context.Products.AddRange(externalProducts);
                        await _context.SaveChangesAsync();
                        products = externalProducts;
                    }
                }
                catch (JsonException ex)
                {
                    return BadRequest($"Error deserializing the response: {ex.Message}");
                }
            }

            return Ok(products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Category = p.Category,
                Image = p.Image
            }).ToList());
        }

        // Fetch a single product by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                var response = await _httpClient.GetAsync($"{_externalApiUrl}/{id}");
                if (!response.IsSuccessStatusCode)
                {
                    return NotFound($"Product with ID {id} not found in external API");
                }

                var json = await response.Content.ReadAsStringAsync();
                product = JsonSerializer.Deserialize<Product>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (product != null)
                {
                    if (string.IsNullOrEmpty(product.Name))
                    {
                        product.Name = "Unnamed Product";
                    }

                    _context.Products.Add(product);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                Category = product.Category,
                Image = product.Image,
            });
        }

        // Add a new product
        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null.");
            }

            if (string.IsNullOrEmpty(product.Name))
            {
                product.Name = "Unnamed Product";
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                Category = product.Category,
                Image = product.Image
            });
        }
        //Update a product
       [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest("Product ID mismatch.");
            }

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            //Update only non - null values
            existingProduct.Name = product.Name ?? existingProduct.Name;
            existingProduct.Price = product.Price > 0 ? product.Price : existingProduct.Price;
            existingProduct.Description = product.Description ?? existingProduct.Description;
            existingProduct.Category = product.Category ?? existingProduct.Category;
            existingProduct.Image = product.Image ?? existingProduct.Image;

            await _context.SaveChangesAsync();

            return Ok(new ProductDto
            {
                Id = existingProduct.Id,
                Name = existingProduct.Name,
                Price = existingProduct.Price,
                Description = existingProduct.Description,
                Category = existingProduct.Category,
                Image = existingProduct.Image
            });
        }


        //Delete a product

       [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
