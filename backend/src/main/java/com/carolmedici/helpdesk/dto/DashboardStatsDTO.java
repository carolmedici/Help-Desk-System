package com.carolmedici.helpdesk.dto;

public record DashboardStatsDTO(
        long totalTickets,
        long pendingTickets,
        long resolvedTickets,
        String averageResponseTime
) {}
