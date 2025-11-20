namespace LachoneteApi.Exceptions;

[System.Serializable]
public class ProibidoException : System.Exception
{
    public ProibidoException(string message) : base(message) {}
}

