namespace LachoneteApi.Exceptions;

[System.Serializable]
public class ParametroInvalidoException : System.Exception
{
    public ParametroInvalidoException(string message) : base(message) { }
}
