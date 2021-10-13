import React,{useState,useEffect}from 'react';
import styles from './styles';
import {useSelector } from "react-redux";
import colors from '../../../component/colors';;
import HTMLView from 'react-native-htmlview';

import {
  SafeAreaView,
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);
  return (
    <View >
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={{
            width:'100%',
            height:40,
            backgroundColor:colors.bc,
            marginTop:5,
            justifyContent:'space-between',
            paddingHorizontal:15,
            flexDirection:'row',
            alignItems:'center'
            }}>
        <Text style={styles.headerText}>
          {item.question}
        </Text>
       {item.isExpanded?<Image style={{width:26,height:18}} source={require('../../../assets/Image/wDown.png')}/>:
       <Image style={{width:26,height:18}} source={require('../../../assets/Image/wFarword.png')}/>}
      </TouchableOpacity>
     
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
          paddingHorizontal:10
        }}>
            {/* <Text style={styles.text}>
             {item.answer.answer}
            </Text> */}
             <HTMLView
        value={item.answer.answer}
      />
      </View>
    </View>
  );
};

const Faq = () => {
  const selector=useSelector(state=>state.FaqArray)
  const [listDataSource, setListDataSource] = useState(selector);
  const [multiSelect, setMultiSelect] = useState(false);

 
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
             !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Faq;

const data= [
    {
        "isExpanded": false,
        "question": "Where is Tajmahala?",
        "faq_id": "1",
        "answer": {
            "answer": "Dehli"
        }
    },
    {
        "isExpanded": false,
        "question": "Where is charminar?",
        "faq_id": "2",
        "answer": {
            "answer": "hydrabad"
        }
    }
]
