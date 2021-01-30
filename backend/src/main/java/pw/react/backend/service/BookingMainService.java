package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.model.Booking;

@Service
public class BookingMainService implements BookingService {
    private final Logger logger = LoggerFactory.getLogger(BookingMainService.class);
    private BookingRepository repository;

    BookingMainService(){}

    @Autowired
    BookingMainService(BookingRepository repository){
        this.repository = repository;
    }

    @Override
    public Booking updateBooking(Long id, Booking updatedBooking) {
        Booking result = Booking.EMPTY;
        if(repository.existsById(id)){
            updatedBooking.setId(id);
            result = repository.save(updatedBooking);
            logger.info("Booking with id {} updated.", id);
        }
        return result;
    }

    @Override
    public boolean deleteBooking(Long Id) {
        boolean result = false;
        if(repository.existsById(Id)){
            repository.deleteById(Id);
            logger.info("Booking with id {} deleted", Id);
            result = true;
        }
        return result;
    }
}
