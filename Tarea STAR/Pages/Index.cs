using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System.Data;
namespace Tarea_STAR.Pages
{

    public class LoginModel : PageModel
    {
        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public bool InvalidCredentials { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            string connectionString = @"Data Source=DESKTOP-OOLUI0G;Initial Catalog=Users;Integrated Security=True;Encrypt=False";

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT * FROM Login WHERE username = @Username AND password = @Password";
                    SqlCommand command = new SqlCommand(query, conn);
                    command.Parameters.AddWithValue("@Username", Username);
                    command.Parameters.AddWithValue("@Password", Password);

                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    if (dataTable.Rows.Count > 0)
                    {
                        return Redirect("Charts");
                    }
                    else
                    {
                        InvalidCredentials = true;
                        return Page();
                    }
                }
            }
            catch
            {
                return Page();
            }
        }
    }
}
