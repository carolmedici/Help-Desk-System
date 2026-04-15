package com.carolmedici.helpdesk.dto;

import com.carolmedici.helpdesk.enums.TicketStatus;

public record TicketUpdateDTO(
        TicketStatus status,
        String solution,
        String resolutionType
) {}
