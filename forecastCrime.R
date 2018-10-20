library(forecast)
# Map 1-based optional input ports to variables
dataset1 <- read.csv('trainingData.csv') # class: data.frame
#dataset2 <- maml.mapInputPort(2) # class: data.frame
print(dataset1)


seasonality<-1

time_labels <- as.numeric(dataset1$time)
lat_labels <- as.numeric(dataset1$crime_location_lat)
long_labels <- as.numeric(dataset1$crime_location_long)


time_timeseries <- ts(time_labels,frequency=seasonality)
lat_timeseries <- ts(lat_labels,frequency=seasonality)
long_timeseries <- ts(long_labels,frequency=seasonality)

#time_model <- auto.arima(time_timeseries)
#lat_model <- auto.arima(lat_timeseries)
#long_model <- auto.arima(long_timeseries)

time_model <- auto.arima(time_timeseries)
lat_model <- auto.arima(lat_timeseries)
long_model <- auto.arima(long_timeseries)

time_forecastedData <- forecast(time_model, h=10)
lat_forecastedData <- forecast(lat_model, h=10)
long_forecastedData <- forecast(long_model, h=10)

time_forecastedData <- as.numeric(time_forecastedData$mean)
lat_forecastedData <- as.numeric(lat_forecastedData$mean)
long_forecastedData <- as.numeric(long_forecastedData$mean)


#output <- data.frame(cbind(dataset2,forecastedData))
#output <- data.frame(time=dataset2$time,forecast=forecastedData)
output <- data.frame(time=time_forecastedData, lat_forecast=lat_forecastedData,long_forecast=long_forecastedData)
print(output)
#data.set <- output

# Select data.frame to be sent to the output Dataset port
#maml.mapOutputPort("data.set");