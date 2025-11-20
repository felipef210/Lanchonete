using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
 
namespace LachoneteApi.Exceptions;

internal sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
    HttpContext httpContext,
    Exception exception,
    CancellationToken cancellationToken
)
    {
        logger.LogError(exception, "Ocorreu uma exceção não tratada");
 
        httpContext.Response.StatusCode = exception switch
        {
            ApplicationException => StatusCodes.Status400BadRequest,
            NaoEncontradoException => StatusCodes.Status404NotFound,
            ParametroInvalidoException => StatusCodes.Status400BadRequest,
            ProibidoException => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };
 
        await httpContext.Response.WriteAsJsonAsync(
            new ProblemDetails
            {
                Type = exception.GetType().Name,
                Title = "Ocorreu um erro, tente novamente",
                Detail = exception.Message
            }
        );
        return true;
    }
}