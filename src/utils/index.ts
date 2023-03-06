export const getVPD = () => {
	// TODO: implementar calculo de VPD
	// no backend seria bom ter valores de offset tanto da calibração da temperatura/umidade
	// quanto o offset da temperatura da folha <- porque isso será usado para o cálculo do VPD da leaf
	// que é o valor que mais importa pro usuário
};

export const getDewPoint = () => {
	// TODO: implementar calculo de dew point
};

// temperature in celcius

// pulse version
// VPD = 0.611e [17.502 × Temperature/(Temperature+240.97)]
// × (1–Relative Air Humidity)
const vpCalc = (temp: number, offsetTemp: number = 0.0) => {
	let auxTemp = 0.0;
	if (offsetTemp) {
		auxTemp = temp - offsetTemp;
	} else {
		auxTemp = temp;
	}
	const tempCalc = (auxTemp / (auxTemp + 237.3)) * 17.2694;
	return ((610.78 * Math.pow(2.71828, tempCalc)) / 1000) as number;
};

// VPD Air (only taking into consideration the air temperature)
const vpdCalc = (temp: number, relHumidity: number) => {
	const relHum = relHumidity / 100;
	const currVpSatCalc = vpCalc(temp);
	return (currVpSatCalc * (1 - relHum)) as number;
};

const vpAir = vpCalc(25);
console.log("vpsatCalc", vpAir);
console.log("vpdCalc", vpdCalc(25, 50));

// to get the VPD Leaf (which is the one that really matters) we have to get the
// leaf temperature (since it may vary 1-3 *C)
const leafTempOffset = 1.1; // diff between leaf temperature and ait temperature
const testRh = 50.0;
const lsvp = vpCalc(25, leafTempOffset);
console.log("lsvp", lsvp);
const airPortion = vpAir * (testRh / 100);

const leafVPD = lsvp - airPortion;

console.log("leafVPD", leafVPD);
