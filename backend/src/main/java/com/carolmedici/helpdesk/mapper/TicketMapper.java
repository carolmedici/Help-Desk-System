package com.carolmedici.helpdesk.mapper;

import com.carolmedici.helpdesk.dto.TicketRequest;
import com.carolmedici.helpdesk.dto.TicketResponse;
import com.carolmedici.helpdesk.entity.Ticket;

public class TicketMapper {

    public static Ticket toEntity(TicketRequest request){
        Ticket ticket = new Ticket();
        ticket.setTitle(request.title());
        ticket.setDescription(request.description());
        return  ticket;
    }

    public static TicketResponse toResponse(Ticket ticket){
        return  new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getStatus()!= null ? ticket.getStatus().name() : "UNKNOWN",
                ticket.getCreatedAt()
        );
    }
}
