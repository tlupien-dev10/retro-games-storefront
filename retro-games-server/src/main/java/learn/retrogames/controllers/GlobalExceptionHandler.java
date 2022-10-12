package learn.retrogames.controllers;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler (SQLException.class)
    public ResponseEntity<String> handleException(SQLException ex){
        return new ResponseEntity<>("There was an error in the SQL grammar.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler (DataAccessException.class)
    public ResponseEntity<String> handleException(DataAccessException ex){
        return new ResponseEntity<>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler (HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleException(HttpMessageNotReadableException ex){
        ErrorResponse errorResponse = new ErrorResponse("Http Message not readable.");
        return new ResponseEntity<ErrorResponse>(
                errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler (HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleException(HttpMediaTypeNotSupportedException ex){
        ErrorResponse errorResponse = new ErrorResponse("Media type not supported.");
        return new ResponseEntity<ErrorResponse>(
                errorResponse, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler (HttpMediaTypeNotAcceptableException.class)
    public ResponseEntity<ErrorResponse> handleException(HttpMediaTypeNotAcceptableException ex){
        ErrorResponse errorResponse = new ErrorResponse("Media type not accepted.");
        return new ResponseEntity<ErrorResponse>(
                errorResponse, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler (Exception.class)
    public ResponseEntity<String> handleException(Exception ex){
        return new ResponseEntity<>("Something went wrong on our end. Your request failed. :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
