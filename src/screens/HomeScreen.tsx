// HomeScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddEmployee from '../components/AddEmployee';
import {fontType} from '../assets/fonts';
import {useNavigation} from '@react-navigation/native';

interface Address {
  city: string;
  state: string;
  line1: string;
}

interface Employee {
  _id: string;
  address: Address;
  contactMethods: {
    email: string;
    phone: string;
  };
  dateOfJoining: string; // assuming date is in "DD-MM-YYYY" format
  department: string;
  emp_id: string | null;
  firstName: string;
  lastName: string;
}

const HomeScreen: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const mockData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      _id: 'qsxs',
      department: 'Human Resource',
      dateOfJoining: '26-10-2021',
      address: {
        line1: '123 Main St',
        city: 'Springfield',
        state: 'IL',
      },
      contactMethods: {
        email: 'john.doe@example.com',
        phone: '555-1234',
      },
    },
  ];

  const fetchEmployees = async () => {
    console.log('gugi');
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee_dir?offset=${0}&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
            projectId: '66aa21c7440310e3620e0a31',
            environmentId: '66aa21c7440310e3620e0a32',
          },
        },
      );
      let data: any = [];
      if (!response.ok) {
        setHasError(false);
        setIsLoading(false);
        setEmployees(mockData);
      } else {
        data = await response.json();
        setEmployees(data?.data);
      }
    } catch (error) {
      setHasError(true);
      setEmployees([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreEmployees = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({item}: {item: Employee}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EmployeeDetails', {})}
      style={[styles.card, styles.employeeContainer]}>
      <Image source={require('../assets/employee.png')} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.firstName + ' ' + item.lastName}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.department}>{item.department}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.id}>{item._id}</Text>
        </View>
      </View>
      <Image
        style={styles.rightArrow}
        source={require('../assets/right-arrow.png')}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoadingMore || !isLoading) {
      return null;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#ff61d2" />
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.noDataImage}
        resizeMode="contain"
        source={require('../assets/no-data.png')}
      />
      <Text style={styles.emptyText}>No employees found</Text>
    </View>
  );

  const setModalVisibility = (value: boolean) => {
    setIsModalVisible(value);
  };

  if (isLoading && employees.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff61d2" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Unable to fetch data. Please try again later.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEmployees}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1A191A', '#1A191B', '#1B1A1B']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <LinearGradient colors={['#7b42f6', '#f571c7']} style={styles.header}>
        <Text style={styles.title}>Employee Directory</Text>
      </LinearGradient>

      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreEmployees}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContentContainer}
      />
      {isModalVisible && (
        <AddEmployee
          isModalVisible={isModalVisible}
          setModalVisibility={setModalVisibility}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Employee</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: '#EDEDEF',
    fontFamily: fontType.medium,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  employeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: fontType.semiBold,
    fontSize: 16,
    color: '#464646',
  },
  department: {
    fontFamily: fontType.medium,
    fontSize: 12,
    color: '#999',
  },
  id: {
    fontFamily: fontType.medium,
    color: '#333',
  },
  rightArrow: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    paddingTop: 10,
    fontSize: 14,
    color: '#bbb',
  },
  retryButton: {
    borderColor: '#ff61d2',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  retryButtonText: {
    color: '#ff61d2',
    paddingTop: 0,
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#ff61d2',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
  },
  noDataImage: {
    height: 90,
    borderRadius: 10,
  },
  addButton: {
    borderColor: '#ff61d2',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  addButtonText: {
    color: '#ff61d2',
    paddingTop: 0,
  },
  textContainer: {
    maxWidth: 220,
  },
});

export default HomeScreen;
