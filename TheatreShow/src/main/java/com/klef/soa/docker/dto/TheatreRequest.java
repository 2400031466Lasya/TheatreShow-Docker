
package com.klef.soa.docker.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TheatreRequest {

    @NotBlank(message = "Show title is required")
    private String showTitle;

    @NotBlank(message = "Language is required")
    private String language;

    @NotBlank(message = "Show date is required")
    private String showDate;

    @NotNull(message = "Ticket price is required")
    @DecimalMin(value = "0.0",
            message = "Ticket price cannot be negative")
    private Double ticketPrice;

    public String getShowTitle() {
        return showTitle;
    }

    public void setShowTitle(String showTitle) {
        this.showTitle = showTitle;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
