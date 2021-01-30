package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.model.Booking;

public interface BookingService {
    Booking updateBooking(Long id, Booking updatedBooking);
    boolean deleteBooking(Long id);
}
