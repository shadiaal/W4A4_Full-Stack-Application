﻿


namespace OrderService.Model.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public int ProductId { get; set; } 
       
       
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
