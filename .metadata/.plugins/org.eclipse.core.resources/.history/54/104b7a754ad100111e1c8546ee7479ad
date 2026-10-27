
package com.klef.soa.docker.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.TheatreRequest;
import com.klef.soa.docker.dto.TheatreResponse;
import com.klef.soa.docker.entity.Theatre;
import com.klef.soa.docker.repository.TheatreRepository;
import com.klef.soa.docker.service.TheatreService;

@Service
public class TheatreServiceImpl implements TheatreService {

    @Autowired
    private TheatreRepository theatreRepository;

    @Override
    public TheatreResponse addTheatre(TheatreRequest request) {

        Theatre theatre = new Theatre();

        theatre.setShowTitle(request.getShowTitle());
        theatre.setLanguage(request.getLanguage());
        theatre.setShowDate(request.getShowDate());
        theatre.setTicketPrice(request.getTicketPrice());

        Theatre saved = theatreRepository.save(theatre);

        return convertToResponse(saved);
    }

    @Override
    public List<TheatreResponse> displayAllTheatres() {

        return theatreRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TheatreResponse getTheatreById(Long id) {

        Optional<Theatre> optional = theatreRepository.findById(id);

        if (optional.isPresent()) {
            return convertToResponse(optional.get());
        }

        return null;
    }

    @Override
    public TheatreResponse updateTheatre(
            Long id, TheatreRequest request) {

        Optional<Theatre> optional = theatreRepository.findById(id);

        if (optional.isPresent()) {

            Theatre theatre = optional.get();

            theatre.setShowTitle(request.getShowTitle());
            theatre.setLanguage(request.getLanguage());
            theatre.setShowDate(request.getShowDate());
            theatre.setTicketPrice(request.getTicketPrice());

            Theatre updated = theatreRepository.save(theatre);

            return convertToResponse(updated);
        }

        return null;
    }

    @Override
    public void deleteTheatre(Long id) {
        theatreRepository.deleteById(id);
    }

    private TheatreResponse convertToResponse(Theatre theatre) {

        TheatreResponse response = new TheatreResponse();

        response.setId(theatre.getId());
        response.setShowTitle(theatre.getShowTitle());
        response.setLanguage(theatre.getLanguage());
        response.setShowDate(theatre.getShowDate());
        response.setTicketPrice(theatre.getTicketPrice());

        return response;
    }
}
