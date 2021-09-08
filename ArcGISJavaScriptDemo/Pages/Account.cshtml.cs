using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ArcGISJavaScriptDemo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ArcGISJavaScriptDemo.Pages
{
    public class AccountModel : PageModel
    {
        [BindProperty]
        public UserViewModel User { get; set; }

        public void OnGet()
        {
            var userName = HttpContext.User.Identity.Name;
            var claims = HttpContext.User.Claims;
            string fullName = claims.FirstOrDefault(t => t.Type == "name").Value;
            var roles = claims.Where(t => t.Type == ClaimTypes.Role).ToList();


            this.User = new UserViewModel()
            {
                Username = userName,
                DisplayName = fullName,
                UserRoles = roles.Count == 0 ? "Role not assigned for user" : string.Join(",", roles.Select(t => t.Value).ToList())
            };
        }
    }
}
