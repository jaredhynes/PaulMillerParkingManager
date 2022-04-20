import {ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger} from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import map from "../../Images/prototype_map.png";
//import '../../Styles/mapimage.css'

const MapImage = (props) => {
    const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
        +
    </ImageTooltipsTrigger>);

    return ( 
        <ImageTooltips src={map} width={900} height={800} className="my-image" triggerEvent="click">
            <ImageTooltipsItem top={1} left={200} trigger={MyTrigger} className="my-item">
                <p>Dummy Data:</p>
                <p>Vin: 454345</p>
            </ImageTooltipsItem>
            <ImageTooltipsItem top={50} left={300} trigger={MyTrigger} className="my-item">
                <p>Dummy Data:</p>
                <p>Vin 3454345</p>
            </ImageTooltipsItem>
        </ImageTooltips>
     );
}
export default MapImage;