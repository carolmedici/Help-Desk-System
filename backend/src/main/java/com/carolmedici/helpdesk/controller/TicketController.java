package com.carolmedici.helpdesk.controller;

import com.carolmedici.helpdesk.entity.Ticket;
import com.carolmedici.helpdesk.enums.TicketStatus;
import com.carolmedici.helpdesk.service.TicketService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @PostMapping("/create-ticket")
    @PreAuthorize("hasRole('USER')")
    public Ticket create(@RequestBody Ticket ticket, @AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getSubject();
        ticket.setUserId(userId);

        return  service.create(ticket);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public List<Ticket> myTickets(@AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getSubject();
        return service.getByUser(userId);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public  Ticket updaTicketatus(@PathVariable Long id, @RequestParam String status){
        Ticket ticket = service.findById(id);
        ticket.setStatus(TicketStatus.valueOf(status));

        return  service.save(ticket);
    }
}
