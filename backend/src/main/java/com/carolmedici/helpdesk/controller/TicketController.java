package com.carolmedici.helpdesk.controller;

import com.carolmedici.helpdesk.dto.DashboardStatsDTO;
import com.carolmedici.helpdesk.dto.TicketRequest;
import com.carolmedici.helpdesk.dto.TicketResponse;
import com.carolmedici.helpdesk.dto.TicketUpdateDTO;
import com.carolmedici.helpdesk.entity.Ticket;
import com.carolmedici.helpdesk.enums.TicketStatus;
import com.carolmedici.helpdesk.mapper.TicketMapper;
import com.carolmedici.helpdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<?> myTickets(@AuthenticationPrincipal Jwt jwt){
        try {
            String userId = jwt.getSubject();
            var tickets = service.getByUser(userId);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public Ticket updateTicketStatus(
            @PathVariable Long id,
            @RequestBody TicketUpdateDTO data
    ) {
        return service.updateStatus(id, data.status(), data.solution(), data.resolutionType());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public TicketResponse getById(@PathVariable Long id) {
        return TicketMapper.toResponse(service.findById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<TicketResponse> getAll(){
        return service.findAll().stream().map(TicketMapper::toResponse).toList();
    }

    @GetMapping("stats/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsDTO> getAdminStats() {
        return ResponseEntity.ok(service.getAdminStats());
    }

    @GetMapping("stats/my-stats")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<DashboardStatsDTO> getUserStats(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(service.getUserStats(userId));
    }
}
