
export default function(d){

	return {
    year: d.iyear,
    month: d.imonth,
    day: d.iday,
		lng:+d.longitude,
    lat:+d.latitude,
    state:d.provstate,
		event_id:d.eventid,
		toll:d.toll,
		summary:d.summary,
		attacktype:d.attacktype1_txt,
		city:d.city,
		nkill:d.nkill,
		nwound:d.nwound,
		target1:d.targtype1_txt,
		subtype:d.targsubtype1,
		success:d.success,
		// target2:d.targtype2_txt,
		// target3:d.targtype3_txt,
	}
}
