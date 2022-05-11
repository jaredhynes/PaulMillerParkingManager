import { ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger } from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import map from "../../Images/prototype_map.png";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import Tooltip from '@mui/material/Tooltip';
import '../../Styles/mapimage.css'


const MapImage = (props) => {

    function logData(car) {
        Swal.fire({
            title: `${car.vin}`,
            html: `<p>Make/Model: ${car.make_model}<p>
                    <p>Location: ${car.spot_name}<p>`
        })
    }

    function IconMaker(car) {
        const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
            <Tooltip title={car.spot_name} placement="right">
                <IconButton onClick={() => logData(car)}>
                    <DirectionsCarIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            {car.spot_name}
        </ImageTooltipsTrigger>);

        return MyTrigger;
    }


    return (
        <ImageTooltips src={map} width={900} height={900} className="my-image" triggerEvent="click">
            {props.carList.map(car => <ImageTooltipsItem top={car.y_val} left={car.x_val} trigger={IconMaker(car)} className="my-item">
            </ImageTooltipsItem>)}
        </ImageTooltips>
    );
}
export default MapImage;