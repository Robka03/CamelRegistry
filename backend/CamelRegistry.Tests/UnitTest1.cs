using System.ComponentModel.DataAnnotations;
using CamelRegistry.Api.Models;
using Xunit;

namespace CamelRegistry.Tests;

public class CamelTests
{
    [Theory]
    [InlineData(1, true)]  
    [InlineData(2, true)]  
    [InlineData(3, false)] 
    public void Camel_HumpCount_Validation_Works(int humpCount, bool expectedValid)
    {

        
        var camel = new Camel { Name = "Test Camel", HumpCount = humpCount };
        var context = new ValidationContext(camel);
        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(camel, context, results, true);

        Assert.Equal(expectedValid, isValid);
    }
}