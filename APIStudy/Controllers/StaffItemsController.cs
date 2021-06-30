using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIStudy.Models;
using Staff.Models;

namespace APIStudy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffItemsController : ControllerBase
    {
        private readonly StaffContext _context;

        public StaffItemsController(StaffContext context)
        {
            _context = context;
        }

        // GET: api/StaffItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffItem>>> GetStaffItems()
        {
            return await _context.StaffItems.ToListAsync();

        }

        // GET: api/StaffItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StaffItem>> GetStaffItem(int id)
        {
            var staffItem = await _context.StaffItems.FindAsync(id);

            if (staffItem == null)
            {
                return NotFound();
            }

            return staffItem;
        }

        // PUT: api/StaffItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStaffItem(long id, StaffItem staffItem)
        {
            if (id != staffItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(staffItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StaffItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StaffItem>> PostStaffItem(StaffItem staffItem)
        {
            _context.StaffItems.Add(staffItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaffItem", new { id = staffItem.Id }, staffItem);
        }

        // DELETE: api/StaffItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaffItem(long id)
        {
            var staffItem = await _context.StaffItems.FindAsync(id);
            if (staffItem == null)
            {
                return NotFound();
            }

            _context.StaffItems.Remove(staffItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StaffItemExists(long id)
        {
            return _context.StaffItems.Any(e => e.Id == id);
        }
    }
}
