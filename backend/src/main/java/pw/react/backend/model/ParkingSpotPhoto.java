package pw.react.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "parking_spot_photo")
@Data
public class ParkingSpotPhoto {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String fileName;
    private String fileType;
    private long size;
    private long parkingSpotId;
    @Lob
    private byte[] data;

    public ParkingSpotPhoto(String fileName, String fileType, long parkingSpotId, byte[] data, long size){
        this.fileName = fileName;
        this.fileType = fileType;
        this.parkingSpotId = parkingSpotId;
        this.data = data;
        this.size = size;
    }

    public ParkingSpotPhoto() {

    }
}
