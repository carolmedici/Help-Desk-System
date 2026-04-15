package com.carolmedici.helpdesk.dto;

import java.time.LocalDateTime;
import java.util.Date;

public record TicketResponse(
        Long id,
        String title,
        String description,
        String status,
        LocalDateTime createdAt
) {}
