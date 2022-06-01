import { ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger } from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import map from "../../Images/parkinglot.png";
//import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import '../../Styles/mapimage.css';
import { highlightCar } from "../../functions";
import { MdDirectionsCar } from "react-icons/md";
import { useNavigate } from "react-router";
import HLCarIcon from "./HLCarIcon";



const MapImage = (props) => {
    const navigate = useNavigate()

    function showInfo(car) {
        Swal.fire({
            title: `${car.vin}`,
            html: `<p>Make/Model: ${car.make_model}<p>
                    <p>Location: ${car.spot_name}<p>`,
            showCloseButton: true,
            confirmButtonText: "View Car Details"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/details/${car.vin}`)
            }
        })
    }

    function showCarIcon(car){
        let ret = null
        if( highlightCar === car.spot_name){
            ret = <HLCarIcon spot_name={car.spot_name}/>
        }
        else{
            ret = <MdDirectionsCar className="mapicon" color="white" />
        }

        return ret;
    }

    function IconMaker(car, highlightCar) {
        const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
            <Tooltip title={car.spot_name} placement="bottom">
                <IconButton onClick={() => showInfo(car)}>
                    {showCarIcon(car)}
                </IconButton>
            </Tooltip>
        </ImageTooltipsTrigger>);
        return MyTrigger;
    }

    return (
        <ImageTooltips src={map} width={900} height={900} className="my-image" triggerEvent="click">
            {props.carList.filter(car => car.x_val).map(car => <ImageTooltipsItem top={car.y_val} left={car.x_val} trigger={IconMaker(car, highlightCar)} className="my-item">
            </ImageTooltipsItem>)}
        </ImageTooltips>
    );
}
export default MapImage;