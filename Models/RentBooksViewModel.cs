using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ComicSystem.Models
{
    public class RentBooksViewModel
    {
        [Required]
        public int CustomerID { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public List<RentalDetailViewModel> RentalDetails { get; set; }
    }

    public class RentalDetailViewModel
    {
        [Required]
        public int ComicBookID { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }
    }
}
