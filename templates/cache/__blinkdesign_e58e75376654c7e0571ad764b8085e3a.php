<?php

class __blinkdesign_e58e75376654c7e0571ad764b8085e3a extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= $indent . '<figure class="work-img-container">';
        $buffer .= "\n";
        $buffer .= $indent . '    <a href="';
        $value = $context->find('url');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '" class="highslide">';
        $buffer .= "\n";
        $buffer .= $indent . '        <img class="work-img work-img-large" src="';
        $value = $context->find('thumb');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '" alt="';
        $value = $context->find('name');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '">';
        $buffer .= "\n";
        $buffer .= $indent . '    </a>';
        $buffer .= "\n";
        $buffer .= $indent . '</figure>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

}