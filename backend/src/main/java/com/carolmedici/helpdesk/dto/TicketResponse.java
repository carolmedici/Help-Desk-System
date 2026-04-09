package com.carolmedici.helpdesk.dto;

public record TicketResponse(
        Long id,
        String title,
        String description,
        String status
) {}
