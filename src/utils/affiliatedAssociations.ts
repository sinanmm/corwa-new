import { Association } from '@/types';

const GENERIC_WORDS = [
  'റസിഡൻസ്',
  'റസിഡന് സ്',
  'റസിഡന്റ്സ്',
  'റെസിഡന്റ്സ്',
  'റെസിഡന്റ്‌സ്',
  'റെസിഡൻസ്',
  'അസോസിയേഷൻ',
  'കൂട്ടായ്മ',
  'association',
  'residence',
  'resident',
  'residents',
];

const NORMALIZATION_MAP: Array<[RegExp, string]> = [
  [/അരിയലൂർ/g, 'അരിയല്ലൂർ'],
  [/ചരമംഗലം/g, 'ചിരമംഗലം'],
  [/പുഞ്ചപ്പാടം/g, 'പുഞ്ചപാടം'],
  [/വള്ളികുന്ന്/g, 'വള്ളിക്കുന്നു'],
  [/വള്ളികുന്നു/g, 'വള്ളിക്കുന്നു'],
  [/gups/gi, 'ജി യു പി എസ്'],
];

type AffiliationRule = {
  label: string;
  requiredTokens: string[];
};

const AFFILIATED_RULES: AffiliationRule[] = [
  { label: 'സൗഹൃദം റസിഡൻസ് അസോസിയേഷൻ പെരിന്തൽമണ്ണ', requiredTokens: ['പെരിന്തൽമണ്ണ', 'സൗഹൃദം'] },
  { label: 'ചെമ്മാട് എക്സ്ചേഞ്ച് റോഡ് റസിഡൻസ് അസോസിയേഷൻ', requiredTokens: ['ചെമ്മാട്', 'എക്സ്ചേഞ്ച്', 'റോഡ്'] },
  { label: 'കനിവ് റസിഡൻസ് പരപ്പനങ്ങാടി', requiredTokens: ['പരപ്പനങ്ങാടി', 'കനിവ്'] },
  { label: 'അത്താണി റസിഡൻസ് അസോസിയേഷൻ അത്താണിക്കൽ', requiredTokens: ['അത്താണി'] },
  { label: 'കനവ് റസിഡൻസ് അസോസിയേഷൻ അരിയലൂർ', requiredTokens: ['കനവ്'] },
  { label: 'നാലു കണ്ടം പുഞ്ചപ്പാടം കൂട്ടുമൂച്ചി', requiredTokens: ['കൂട്ടുമൂച്ചി', 'നാലുകണ്ടം', 'പുഞ്ചപാടം'] },
  { label: 'സുധീഷ് നഗർ റസിഡൻസ് അസോസിയേഷൻ പെരിന്തൽമണ്ണ', requiredTokens: ['പെരിന്തൽമണ്ണ', 'സുധീഷ്', 'നഗർ'] },
  { label: 'ജി യു പി എസ് റസിഡൻസ് അസോസിയേഷൻ അരിയല്ലൂർ', requiredTokens: ['ജി യു പി എസ്'] },
  { label: 'സൗഹൃദ റെസിഡന്റ്‌സ് റസിഡൻസ് അസോസിയേഷൻ അരിയല്ലൂർ', requiredTokens: ['ചിരമംഗലം', 'സൗഹൃദ'] },
  { label: 'ചരമംഗലം റസിഡൻസ് അസോസിയേഷൻ പരപ്പനങ്ങാടി', requiredTokens: ['പരപ്പനങ്ങാടി', 'ചിരമംഗലം'] },
];

function normalizeAssociationText(value: string) {
  let normalized = value.toLowerCase().trim();

  for (const [pattern, replacement] of NORMALIZATION_MAP) {
    normalized = normalized.replace(pattern, replacement);
  }

  normalized = normalized
    .replace(/[(),.-]/g, ' ')
    .replace(/\s+/g, ' ');

  for (const word of GENERIC_WORDS) {
    normalized = normalized.replaceAll(word, ' ');
  }

  return normalized.replace(/\s+/g, ' ').trim();
}

export function getAffiliatedAssociationLabel(name: string) {
  const normalizedName = normalizeAssociationText(name);

  const match = AFFILIATED_RULES.find((rule) =>
    rule.requiredTokens.every((token) => normalizedName.includes(normalizeAssociationText(token)))
  );

  return match?.label ?? null;
}

export function isAffiliatedAssociation(association: Pick<Association, 'name'>) {
  return Boolean(getAffiliatedAssociationLabel(association.name));
}
