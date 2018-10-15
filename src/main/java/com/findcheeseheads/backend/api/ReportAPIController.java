package com.findcheeseheads.backend.api;

import com.findcheeseheads.backend.model.Reason;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class ReportAPIController {


    @GetMapping("reasons")
    public List<Reason> getReasons() {
        return Arrays.asList(Reason.values());
    }
}
