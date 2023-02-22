import mongoose, { Schema } from "mongoose";

export interface IMeasurement {
	metadata: { d_sn: string }; //device serial number
	t: number; // temperature
	h: number; //humidity
	co2: number; // carbon dioxide
	vpd: number; // vapor pressure deficit value
	dp: number; // dew point value
	timestamp?: string;
}

const MeasurementSchema = new Schema<IMeasurement>(
	{
		t: Number,
		h: Number,
		co2: Number,
		vpd: Number,
		dp: Number,
		metadata: Object({ d_sn: String }),
		timestamp: Date,
	},
	{
		timeseries: {
			timeField: "timestamp",
			metaField: "metadata",
		},
	}
);

export const Measurement = mongoose.model("Measurement", MeasurementSchema);
