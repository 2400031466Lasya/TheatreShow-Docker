
package com.klef.soa.docker.dto;

public class TheatreResponse {

    private Long id;
    private String showTitle;
    private String language;
    private String showDate;
    private Double ticketPrice;

    public TheatreResponse() {
    }

    public TheatreResponse(Long id, String showTitle,
                           String language, String showDate,
                           Double ticketPrice) {
        this.id = id;
        this.showTitle = showTitle;
        this.language = language;
        this.showDate = showDate;
        this.ticketPrice = ticketPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
