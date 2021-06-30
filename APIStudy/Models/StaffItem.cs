using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace APIStudy.Models
{
    public class StaffItem
    {
        //[RegularExpression("[0-9]")]
        public int Id { get; set; }

        public string Department { get; set; }

        public string Name { get; set; }

        public string Position { get; set; }

        public string Seniority { get; set; }
    
        public DateTime IsComplete { get; set; }
    }
}
