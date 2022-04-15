import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../assets/constant/Theme';
import axios from 'axios';
import {LineChart} from 'react-native-wagmi-charts';

export default function CryptoProductPage({navigation, route}) {
  let url_id = route.params.id;

  const [cryptoDetails, setCryptoDetails] = useState([]);
  const [cryptoPriceData, setCryptoPriceData] = useState({prices: [0, 0]});
  const [graphLoading, setGraphLoading] = useState(false);
  const [url_values, setUrl_values] = useState({
    name: '1D',
    days: 1,
    interval: 'minutely',
  });

  const url_data = [
    {name: '24h', days: '1', interval: 'minutely'},
    {name: '7d', days: '7', interval: 'hourly'},
    {name: '14d', days: '14', interval: 'hourly'},
    {name: '30d', days: '30', interval: 'hourly'},
    {name: '1y', days: '365', interval: 'daily'},
    {name: '5y', days: '1825', interval: 'daily'},
  ];
  {
    /* Coins Details fetching */
  }
  const crypto_details_url = `https://api.coingecko.com/api/v3/coins/${url_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  function fetchDetails(url) {
    try {
      axios.get(url).then(res => {
        setCryptoDetails(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails(crypto_details_url);
    const interval = setInterval(() => {
      fetchDetails(crypto_details_url);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  {
    /* Coins Data fetching */
  }

  const crypto_price_chart_url = `https://api.coingecko.com/api/v3/coins/${url_id}/market_chart?vs_currency=inr&days=${url_values.days}&interval=${url_values.interval}`;

  async function fetchData(url) {
    let req = await fetch(url);
    let res = await req.json();
    setCryptoPriceData(res);
  }

  useEffect(() => {
    fetchData(crypto_price_chart_url);
    const interval = setInterval(() => {
      fetchData(crypto_price_chart_url);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [crypto_price_chart_url]);

  const data = cryptoPriceData.prices.map(price => ({
    timestamp: price[0],
    value: price[1],
  }));

  // console.log(data, crypto_price_chart_url);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGraphLoading(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // useMemo(() => first, [second])

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          width: SIZES.width,
          height: 75,
          backgroundColor: COLORS.transparent,
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 10,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}>
            <View
              style={{
                width: 24,
                height: 24,
              }}>
              <Image
                source={require('../assets/icons/Arrow_back.png')}
                style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '100%',
                  tintColor: '#7F7FFF',
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              marginLeft: 130,
              paddingTop: 5,
            }}>
            <Text
              style={{
                color: '#04143D',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 22,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              {cryptoDetails.symbol}
            </Text>
          </View>
        </View>
      </View>
      {/* Coins Basic Details */}
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 15,
            height: 75,
            width: SIZES.width - 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: '100%',
              width: 65,
              backgroundColor: '#ECECFF',
              borderRadius: 15,
            }}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <Image
                source={{uri: cryptoDetails?.image?.large}}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: SIZES.width * 0.67,
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 2,
            }}>
            {/* Coins name and symbol/short form */}
            <View>
              <View>
                <Text
                  style={{
                    color: '#04143D',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 20,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                  {cryptoDetails?.symbol}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#5068AF',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 15,
                  }}>
                  {cryptoDetails?.name}
                </Text>
              </View>
            </View>
            {/* Coins current price and gain and loss */}
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <View>
                <Text
                  style={{
                    color: '#263EB2',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#263EB2',
                      fontWeight: '600',
                    }}>
                    ₹
                  </Text>{' '}
                  <Text
                    style={{
                      fontSize: 19,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#263EB2',
                      alignSelf: 'center',
                    }}>
                    {new Intl.NumberFormat('en-IN', {}).format(
                      cryptoDetails?.market_data?.current_price?.inr.toFixed(2),
                    )}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#828282',
                    fontSize: 14.25,
                    letterSpacing: 0.5,
                  }}>
                  ₹{''}
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {new Intl.NumberFormat('en-IN').format(
                      cryptoDetails?.market_data?.price_change_24h.toFixed(2),
                    )}
                  </Text>
                </Text>
                <Text
                  style={{
                    color:
                      cryptoDetails?.market_data?.price_change_percentage_24h >=
                      0
                        ? COLORS.green
                        : COLORS.red,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 13.25,
                  }}>
                  {' '}
                  (
                  {cryptoDetails?.market_data?.price_change_percentage_24h.toFixed(
                    2,
                  )}
                  )%
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Coins Basic Chart */}

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 15,
            width: SIZES.width - 40,
            backgroundColor: '#ECECFF',
            borderRadius: 15,
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
          {graphLoading && (
            <LineChart.Provider data={data}>
              <LineChart
                width={325}
                height={250}
                style={{
                  backgroundColor: COLORS.transparent,
                }}>
                <LineChart.Path color="#7F7FFF" width={2.5}>
                  <LineChart.Gradient color="#263EB2" />
                </LineChart.Path>
                <LineChart.CursorLine />
                <LineChart.CursorCrosshair>
                  <LineChart.Tooltip yGutter={-25}>
                    <LineChart.PriceText
                      style={{
                        fontFamily: 'Poppins-Medium',
                      }}></LineChart.PriceText>
                  </LineChart.Tooltip>
                  <LineChart.Tooltip position="bottom" yGutter={-25}>
                    <LineChart.DatetimeText
                      options={{
                        month: 'short',
                        day: 'numeric',
                        year: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                      }}
                      style={{
                        fontFamily: 'Poppins-Medium',
                      }}
                    />
                  </LineChart.Tooltip>
                </LineChart.CursorCrosshair>
              </LineChart>
            </LineChart.Provider>
          )}
          <View
            style={{
              width: 327,
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            {url_data.map((value, index) => {
              let {name, days, interval} = value;

              return (
                <TouchableWithoutFeedback
                  key={index.toString()}
                  style={{
                    width: 45,
                    height: '100%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setUrl_values({name, days, interval});
                  }}>
                  <View
                    style={{
                      height: 24,
                      width: 45,
                      backgroundColor:
                        url_values.days == days ? '#7F7FFF' : '#d1d1ff',
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 15,
                        color: url_values.days != days ? '#7F7FFF' : '#fff',
                      }}>
                      {' '}
                      {name}{' '}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
        {/* Coins Statistics */}
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 15,
            width: SIZES.width - 40,
            backgroundColor: '#ECECFF',
            borderRadius: 15,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Market Cap Rank
            </Text>
            <Text
              style={{
                color: '#4A587A',
                fontSize: 14.25,
                letterSpacing: 0.5,
              }}>
              #{cryptoDetails?.market_data?.market_cap_rank}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Market Cap
            </Text>
            <Text
              style={{
                color: '#4A587A',
                fontSize: 14.25,
                letterSpacing: 0.5,
              }}>
              ₹{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                }}>
                {new Intl.NumberFormat('en-IN', {}).format(
                  cryptoDetails?.market_data?.market_cap?.inr?.toFixed(2),
                )}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Trading Volume
            </Text>
            <Text
              style={{
                color: '#4A587A',
                fontSize: 14.25,
                letterSpacing: 0.5,
              }}>
              ₹{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                }}>
                {new Intl.NumberFormat('en-IN', {}).format(
                  cryptoDetails?.market_data?.total_volume?.inr?.toFixed(2),
                )}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Volume / Market Cap
            </Text>
            <Text
              style={{
                color: '#4A587A',
                fontSize: 14.25,
                letterSpacing: 0.5,
              }}>
              {(
                cryptoDetails?.market_data?.total_volume?.inr /
                cryptoDetails?.market_data?.market_cap?.inr
              ).toFixed(3)}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              24h High
            </Text>
            <Text
              style={{
                color: COLORS.green,
                fontSize: 14.25,
                letterSpacing: 0.5,
              }}>
              ₹{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                }}>
                {new Intl.NumberFormat('en-IN', {}).format(
                  cryptoDetails?.market_data?.high_24h?.inr?.toFixed(2),
                )}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              24h Low
            </Text>
            <Text
              style={{
                color: COLORS.red,
                fontSize: 14.25,
                letterSpacing: 0.5,
              }}>
              ₹{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                }}>
                {new Intl.NumberFormat('en-IN', {}).format(
                  cryptoDetails?.market_data?.low_24h?.inr?.toFixed(2),
                )}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              All-Time High
            </Text>
            <View>
              <Text
                style={{
                  color: '#4A587A',
                  fontSize: 14.25,
                  letterSpacing: 0.5,
                }}>
                ₹{' '}
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {new Intl.NumberFormat('en-IN', {}).format(
                    cryptoDetails?.market_data?.ath?.inr?.toFixed(2),
                  )}
                </Text>
                <Text
                  style={{
                    color:
                      cryptoDetails?.market_data?.ath_change_percentage?.inr > 0
                        ? COLORS.green
                        : COLORS.red,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 13.25,
                  }}>
                  {' '}
                  (
                  {cryptoDetails?.market_data?.ath_change_percentage?.inr.toFixed(
                    2,
                  )}
                  )%
                </Text>
              </Text>
              <Text
                style={{
                  color: '#858994',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  textAlign: 'right',
                }}>
                {new Date(
                  cryptoDetails?.market_data?.atl_date?.inr,
                ).toDateString()}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                color: '#4A587A',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              All-Time Low
            </Text>
            <View>
              <Text
                style={{
                  color: '#4A587A',
                  fontSize: 14.25,
                  letterSpacing: 0.5,
                }}>
                ₹{' '}
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {new Intl.NumberFormat('en-IN', {}).format(
                    cryptoDetails?.market_data?.atl?.inr?.toFixed(2),
                  )}
                </Text>
                <Text
                  style={{
                    color:
                      cryptoDetails?.market_data?.atl_change_percentage?.inr > 0
                        ? COLORS.green
                        : COLORS.red,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 13.25,
                  }}>
                  {' '}
                  (
                  {cryptoDetails?.market_data?.atl_change_percentage?.inr.toFixed(
                    2,
                  )}
                  )%
                </Text>
              </Text>
              <Text
                style={{
                  color: '#858994',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  textAlign: 'right',
                }}>
                {new Date(
                  cryptoDetails?.market_data?.atl_date?.inr,
                ).toDateString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
