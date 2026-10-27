
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.TheatreRequest;
import com.klef.soa.docker.dto.TheatreResponse;
import com.klef.soa.docker.service.TheatreService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/theatre")
@CrossOrigin(origins = "http://localhost:3001")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @Operation(summary = "Add a theatre")
    @PostMapping("/add")
    public ResponseEntity<TheatreResponse> addTheatre(
            @Valid @RequestBody TheatreRequest request) {

        TheatreResponse response = theatreService.addTheatre(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Display all theatres")
    @GetMapping("/displayall")
    public ResponseEntity<List<TheatreResponse>> displayAllTheatres() {

        return ResponseEntity.ok(
                theatreService.displayAllTheatres());
    }

    @Operation(summary = "Get theatre by ID")
    @GetMapping("/display/{id}")
    public ResponseEntity<TheatreResponse> getTheatreById(
            @PathVariable Long id) {

        TheatreResponse response =
                theatreService.getTheatreById(id);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update a theatre")
    @PutMapping("/update/{id}")
    public ResponseEntity<TheatreResponse> updateTheatre(
            @PathVariable Long id,
            @Valid @RequestBody TheatreRequest request) {

        TheatreResponse response =
                theatreService.updateTheatre(id, request);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete a theatre")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTheatre(
            @PathVariable Long id) {

        if (!theatreService.displayAllTheatres()
                .stream()
                .anyMatch(theatre -> theatre.getId().equals(id))) {
            return ResponseEntity.notFound().build();
        }

        theatreService.deleteTheatre(id);

        return ResponseEntity.noContent().build();
    }
}
