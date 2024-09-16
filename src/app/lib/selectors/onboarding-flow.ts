import {
  OnboardingComponentWithFlow,
  OnboardingField,
} from "@/app/lib/definitions";

const sortAddressFields = (fields: OnboardingField[]) => {
  if (!fields) {
    return [];
  }

  if (!fields.some((field) => field.name === "street_address")) {
    return fields;
  }

  const sortPriority = ["street_address", "city", "state", "zip"];

  return fields.sort((a, b) => {
    return sortPriority.indexOf(a.name) - sortPriority.indexOf(b.name);
  });
};

export const groupAndSortOnboardingFlow = (
  data: OnboardingComponentWithFlow[],
) => {
  if (!data) {
    return [];
  }

  const groupedData = data.reduce(
    (acc: { [key: string]: OnboardingComponentWithFlow[] }, item) => {
      if (!acc[item.step]) {
        acc[item.step] = [];
      }

      acc[item.step].push(item);
      return acc;
    },
    {},
  );

  return Object.entries(groupedData)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([step, components]) => ({
      step: Number(step),
      components: components.sort((a, b) => {
        const sortPriority = ["email", "password"];

        const aFlowUpdatedAt = new Date(a.updated_at).getTime();
        const bFlowUpdatedAt = new Date(b.updated_at).getTime();

        if (aFlowUpdatedAt === bFlowUpdatedAt) {
          return sortPriority.indexOf(a.type) - sortPriority.indexOf(b.type);
        }

        return aFlowUpdatedAt - bFlowUpdatedAt;
      }),
    }))
    .map(({ components, step }) => ({
      step,
      components: components.map((component) => ({
        ...component,
        fields:
          component.type === "address"
            ? sortAddressFields(component.fields)
            : component.fields,
      })),
    }));
};
