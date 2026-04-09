package com.carolmedici.helpdesk.service;

import com.carolmedici.helpdesk.entity.Ticket;
import com.carolmedici.helpdesk.enums.TicketStatus;
import com.carolmedici.helpdesk.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository repository;

    public Ticket create(Ticket ticket){
        ticket.setStatus(TicketStatus.OPEN);
        return repository.save(ticket);
    }

    public List<Ticket> getByUser(String userId){
        return repository.findByUserId(userId);
    }

    public Ticket findById(Long id){
        return  repository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public Ticket save(Ticket ticket){
        return repository.save(ticket);
    }
}
