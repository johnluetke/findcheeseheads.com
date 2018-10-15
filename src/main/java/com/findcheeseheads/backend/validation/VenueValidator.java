package com.findcheeseheads.backend.validation;

import com.findcheeseheads.backend.model.Venue;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class VenueValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Venue.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Venue venue = (Venue) target;
    }
}
