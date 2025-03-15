
using System.ComponentModel.DataAnnotations;

namespace OrderService.Model
{
    public class Order
    {
        [Key] 
        public int Id { get; set; }

        [Required] 
        [StringLength(100, ErrorMessage = "Customer Name cannot exceed 100 characters.")]
        public string CustomerName { get; set; }

        public int ProductId { get; set; } 
      
        [Required] 
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Total Price must be greater than 0.")]
        public decimal TotalPrice { get; set; }

        [Required] 
        public DateTime OrderDate { get; set; } = DateTime.UtcNow; 
    }
}
