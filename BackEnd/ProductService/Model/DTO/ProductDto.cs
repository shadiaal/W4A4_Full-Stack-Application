﻿
namespace ProductService.Model.DTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }  
        public string Image { get; set; }    
     
    }
}
