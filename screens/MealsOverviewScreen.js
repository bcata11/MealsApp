import MealItem from "../components/MealItem";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { View, FlatList, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";

function MealsOverviewScreen({ route, navigation }) {
  const catID = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catID) >= 0;
  });

  const categoryTitle = CATEGORIES.find(
    (category) => category.id === catID
  ).title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catID, navigation]);

  function renderMealItem(itemData) {
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };

    return <MealItem {...mealItemProps} />;
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={displayedMeals}
          keyExtractor={(item) => item.id}
          renderItem={renderMealItem}
        />
      </View>
    </>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
