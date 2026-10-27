
package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.TheatreRequest;
import com.klef.soa.docker.dto.TheatreResponse;

public interface TheatreService {

    TheatreResponse addTheatre(TheatreRequest request);

    List<TheatreResponse> displayAllTheatres();

    TheatreResponse getTheatreById(Long id);

    TheatreResponse updateTheatre(Long id, TheatreRequest request);

    void deleteTheatre(Long id);
}
