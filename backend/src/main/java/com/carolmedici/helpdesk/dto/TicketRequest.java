package com.carolmedici.helpdesk.dto;
import jakarta.validation.constraints.NotBlank;

public record TicketRequest (
        @NotBlank
        String title,

        @NotBlank
        String description
){}
