export const sqlSelectOnboardingComponents = `
  SELECT 
    components.*, 
    flows.step, 
    flows.can_change_step, 
    flows.updated_at AS flow_updated_at,
    json_agg(json_build_object(
        'name', fields.name,
        'placeholder', fields.placeholder,
        'label', fields.label,
        'type', fields.type,
        'required', fields.required
    )) AS fields
  FROM admin_onboarding_components components
  LEFT JOIN admin_onboarding_flows flows
    ON components.component_id = flows.component_id
  LEFT JOIN admin_onboarding_fields fields
    ON components.component_id = fields.component_id
  GROUP BY 
    components.id,
    flows.step,
    flows.can_change_step,
    flows.updated_at;
`;

export const sqlSelectOnboardingComponentByComponentId = (
  componentId: string,
) => `
  SELECT * FROM admin_onboarding_components
  WHERE component_id = '${componentId}';
`;

export const sqlUpdateOnboardingComponentStep = (
  componentId: string,
  step: number,
) => `
  UPDATE admin_onboarding_flows
  SET step = ${step}, updated_at = NOW()
  WHERE component_id = '${componentId}'
  RETURNING *;
`;
