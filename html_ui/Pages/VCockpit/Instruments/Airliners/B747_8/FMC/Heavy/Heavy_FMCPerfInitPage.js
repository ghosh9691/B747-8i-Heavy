class Heavy_FMCPerfInitPage {
	static ShowPage1(fmc) {
		fmc.clearDisplay();
		fmc.updateFuelVars();
		Heavy_FMCPerfInitPage._timer = 0;
		fmc.pageUpdate = () => {
			FMCPerfInitPage._timer++;
			if (FMCPerfInitPage._timer >= 15) {
				FMCPerfInitPage.ShowPage1(fmc);
			}
		};
		let grossWeightCell = FMCString.Line.Box['3'] + FMCString.Common.PERIOD + FMCString.Line.Box['1'];
		if (isFinite(fmc.getWeight(true))) {
			grossWeightCell = fmc.getWeight(true).toFixed(0);
		}
		fmc.onLeftInput[0] = () => {
			let value = fmc.inOut;
			fmc.clearUserInput();
			fmc.setWeight(value, result => {
				if (result) {
					FMCPerfInitPage.ShowPage1(fmc);
				}
			}, true);
		};
		let crzAltCell = FMCString.Line.Box['5'];
		if (isFinite(fmc.cruiseFlightLevel)) {
			crzAltCell = fmc.cruiseFlightLevel.toFixed(0);
		}
		fmc.onRightInput[0] = () => {
			let value = fmc.inOut;
			fmc.clearUserInput();
			if (fmc.setCruiseFlightLevelAndTemperature(value)) {
				FMCPerfInitPage.ShowPage1(fmc);
			}
		};
		let blockFuelCell = FMCString.Line.Box['3'] + FMCString.Common.PERIOD + FMCString.Line.Box['1'];
		if (isFinite(fmc.getBlockFuel(true))) {
			blockFuelCell = fmc.getBlockFuel(true).toFixed(1) + ' lb';
		}
		let zeroFuelWeightCell = FMCString.Line.Box['3'] + FMCString.Common.PERIOD + FMCString.Line.Box['1'];
		if (isFinite(fmc.getZeroFuelWeight(true))) {
			zeroFuelWeightCell = fmc.getZeroFuelWeight(true).toFixed(1);
		}
		fmc.onLeftInput[2] = () => {
			let value = fmc.inOut;
			fmc.clearUserInput();
			if (fmc.trySetZeroFuelWeightZFWCG(value, true)) {
				FMCPerfInitPage.ShowPage1(fmc);
			}
		};
		let costIndex = FMCString.Line.Box['3'];
		if (fmc.costIndex) {
			costIndex = fmc.costIndex + '[color]blue';
		}
		fmc.onLeftInput[4] = () => {
			let value = fmc.inOut;
			fmc.clearUserInput();
			if (fmc.tryUpdateCostIndex(value)) {
				FMCPerfInitPage.ShowPage1(fmc);
			}
		};
		fmc.setTemplate([
			['PERF INIT'],
			['GR WT', 'CRZ ALT'],
			[grossWeightCell, crzAltCell],
			['FUEL', 'COST INDEX'],
			[blockFuelCell, costIndex],
			['ZFW', 'MIN FUEL TEMP'],
			[zeroFuelWeightCell, '-37°c'],
			['RESERVES', 'CRZ CG'],
			[FMCString.Line.Box['3'] + FMCString.Common.PERIOD + FMCString.Line.Box['1'], '20.0%'],
			['DATA LINK', 'STEP SIZE'],
			['NO COMM', 'RVSM'],
			['__FMCSEPARATOR'],
			['<INDEX', 'THRUST LIM>']
		]);
		fmc.onLeftInput[5] = () => {
			B747_8_FMC_InitRefIndexPage.ShowPage1(fmc);
		};
		fmc.onRightInput[5] = () => {
			FMCThrustLimPage.ShowPage1(fmc);
		};
	}
}