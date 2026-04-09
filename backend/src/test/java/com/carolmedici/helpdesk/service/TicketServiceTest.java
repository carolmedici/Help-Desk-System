package com.carolmedici.helpdesk.service;

import com.carolmedici.helpdesk.entity.Ticket;
import com.carolmedici.helpdesk.enums.TicketStatus;
import com.carolmedici.helpdesk.repository.TicketRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository repository;

    @InjectMocks
    private TicketService service;

    @Test
    void shouldCreateTicket() {
        Ticket ticket = new Ticket();
        ticket.setTitle("Test");
        ticket.setDescription("Test description, Test description");

        Ticket savedTicket = new Ticket();
        savedTicket.setId(1L);
        savedTicket.setTitle("Test");
        savedTicket.setDescription("Test description, Test description");
        savedTicket.setStatus(TicketStatus.OPEN);

        when(repository.save(any(Ticket.class))).thenReturn(savedTicket);

        Ticket result = service.create(ticket);

        assertNotNull(result.getId());
        assertEquals(TicketStatus.OPEN, result.getStatus());

        verify(repository, times(1)).save(any(Ticket.class));
    }

    @Test
    void shouldReturnTicketById() {
        Ticket ticket = new Ticket();
        ticket.setId(1L);

        when(repository.findById(1L)).thenReturn(Optional.of(ticket));

        Ticket result = service.findById(1L);
        assertEquals(1L, result.getId());
    }

    @Test
    void shouldThrowExceptionWhenTicketNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.findById(1L)
        );

        assertEquals("Ticket not found", exception.getMessage());
    }
}