using ComicSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComicSystem.Controllers
{
    [Route("api/rentals")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly ComicSystemContext _context;

        public RentalsController(ComicSystemContext context)
        {
            _context = context;
        }

        // Lấy danh sách tất cả các giao dịch thuê sách
        [HttpGet("all")]
        public async Task<IActionResult> GetAllRentals()
        {
            var rentals = await _context.Rentals
                .Include(r => r.Customer)
                .Include(r => r.RentalDetails)
                .ThenInclude(rd => rd.ComicBook)
                .ToListAsync();

            return Ok(rentals);
        }

        // Lấy thông tin giao dịch thuê sách theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentalById(int id)
        {
            var rental = await _context.Rentals
                .Include(r => r.Customer)
                .Include(r => r.RentalDetails)
                .ThenInclude(rd => rd.ComicBook)
                .FirstOrDefaultAsync(r => r.RentalID == id);

            if (rental == null)
                return NotFound(new { Message = $"Rental with ID {id} not found." });

            return Ok(rental);
        }

        // Thêm giao dịch thuê sách
       [HttpPost("rental/books")]
public async Task<IActionResult> RentBooks([FromBody] RentBooksViewModel model)
{
    if (model == null || model.RentalDetails == null || !model.RentalDetails.Any())
    {
        Console.WriteLine("Rental details are missing or empty.");
        return BadRequest(new { Message = "Rental details are required." });
    }

    if (model.ReturnDate == default)
    {
        Console.WriteLine("Return date is missing.");
        return BadRequest(new { Message = "Return date is required." });
    }

    Console.WriteLine("Received rental data:");
    Console.WriteLine($"CustomerID: {model.CustomerID}");
    Console.WriteLine($"ReturnDate: {model.ReturnDate}");
    Console.WriteLine($"Status: {model.Status}");
    foreach (var detail in model.RentalDetails)
    {
        Console.WriteLine($"ComicBookID: {detail.ComicBookID}, Quantity: {detail.Quantity}");
    }

    var customer = await _context.Customers.FindAsync(model.CustomerID);
    if (customer == null)
    {
        Console.WriteLine($"Customer with ID {model.CustomerID} not found.");
        return BadRequest(new { Message = "Customer not found." });
    }

    foreach (var detail in model.RentalDetails)
    {
        var comicBook = await _context.ComicBooks.FindAsync(detail.ComicBookID);
        if (comicBook == null)
        {
            Console.WriteLine($"Comic book with ID {detail.ComicBookID} not found.");
            return BadRequest(new { Message = $"Comic book with ID {detail.ComicBookID} not found." });
        }
    }

    return Ok(new { Message = "Validation passed. Proceeding to create rental..." });
}


        // Cập nhật giao dịch thuê sách
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRental(int id, [FromBody] RentBooksViewModel model)
        {
            var rental = await _context.Rentals
                .Include(r => r.RentalDetails)
                .FirstOrDefaultAsync(r => r.RentalID == id);

            if (rental == null)
                return NotFound(new { Message = $"Rental with ID {id} not found." });

            rental.ReturnDate = model.ReturnDate != default ? model.ReturnDate : rental.ReturnDate;
            rental.Status = !string.IsNullOrEmpty(model.Status) ? model.Status : rental.Status;

            await _context.SaveChangesAsync();
            return Ok(new { Message = "Rental updated successfully.", rental });
        }

        // Xóa một giao dịch thuê sách
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await _context.Rentals
                .Include(r => r.RentalDetails)
                .FirstOrDefaultAsync(r => r.RentalID == id);

            if (rental == null)
                return NotFound(new { Message = $"Rental with ID {id} not found." });

            _context.RentalDetails.RemoveRange(rental.RentalDetails);
            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Rental deleted successfully." });
        }
    }
}
