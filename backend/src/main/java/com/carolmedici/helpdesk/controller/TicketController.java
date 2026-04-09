package com.carolmedici.helpdesk.controller;

import com.carolmedici.helpdesk.dto.TicketRequest;
import com.carolmedici.helpdesk.dto.TicketResponse;
import com.carolmedici.helpdesk.entity.Ticket;
import com.carolmedici.helpdesk.enums.TicketStatus;
import com.carolmedici.helpdesk.mapper.TicketMapper;
import com.carolmedici.helpdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @PostMapping("/create-ticket")
    @PreAuthorize("hasRole('USER')")
    public TicketResponse create(@Valid @RequestBody TicketRequest request, @AuthenticationPrincipal Jwt jwt){

        Ticket ticket = TicketMapper.toEntity(request);
        String userId = jwt.getSubject();
        ticket.setUserId(userId);

        return  TicketMapper.toResponse(service.create(ticket));
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public List<TicketResponse> myTickets(@AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getSubject();
        return service.getByUser(userId).stream().map(TicketMapper::toResponse).toList();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public  Ticket updateTicketStatus(@PathVariable Long id, @RequestParam TicketStatus status){
        return  service.updateStatus(id, status);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public TicketResponse getById(@PathVariable Long id) {
        return TicketMapper.toResponse(service.findById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<TicketResponse> getAll(){
        return service.findAll().stream().map(TicketMapper::toResponse).toList();
    }
}
