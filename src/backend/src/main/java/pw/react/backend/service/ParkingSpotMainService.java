package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.model.ParkingSpot;

public class ParkingSpotMainService implements ParkingSpotService {
    private final Logger logger = LoggerFactory.getLogger(ParkingSpotMainService.class);
    private ParkingSpotRepository repository;

    ParkingSpotMainService(){}

    @Autowired
    ParkingSpotMainService(ParkingSpotRepository repository){
        this.repository = repository;
    }

    @Override
    public ParkingSpot updateParkingSpot(Long id, ParkingSpot updatedParkingSpot) {
        ParkingSpot result = ParkingSpot.EMPTY;
        if(repository.existsById(id)){
            updatedParkingSpot.setId(id);
            result = repository.save(updatedParkingSpot);
            logger.info("Parking spot with id {} updated.", id);
        }
        return result;
    }

    @Override
    public boolean deleteParkingSpot(Long parkingSpotId) {
        boolean result = false;
        if(repository.existsById(parkingSpotId)){
            repository.deleteById(parkingSpotId);
            logger.info("Parking spot with id {} deleted", parkingSpotId);
            result = true;
        }
        return result;
    }
}
