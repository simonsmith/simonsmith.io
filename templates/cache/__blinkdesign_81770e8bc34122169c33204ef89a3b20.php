<?php

class __blinkdesign_81770e8bc34122169c33204ef89a3b20 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= "\n";
        $buffer .= $indent . '    <article>';
        $buffer .= "\n";
        $buffer .= $indent . '        <header class="post-title">';
        $buffer .= "\n";
        $buffer .= $indent . '            <h1 class="hdr hdr-post">';
        $value = $context->find('title');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</h1>';
        $buffer .= "\n";
        $buffer .= $indent . '            <p class="url"><a href="http://';
        $value = $context->find('url');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '">www.';
        $value = $context->find('url');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</a></p>';
        $buffer .= "\n";
        $buffer .= $indent . '            <p class="description">';
        $value = $context->find('excerpt');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</p>';
        $buffer .= "\n";
        $buffer .= $indent . '        </header>';
        $buffer .= "\n";
        $buffer .= $indent . '        <div class="post-content">';
        $buffer .= "\n";
        $buffer .= $indent . '            ';
        $value = $context->find('content');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= "\n";
        $buffer .= $indent . '        </div>';
        $buffer .= "\n";
        $buffer .= $indent . '        <div class="work-images">';
        $buffer .= "\n";
        // 'attachments' section
        $buffer .= $this->section78700b52d7e6b46b5f7da487ce9d46c0($context, $indent, $context->find('attachments'));
        $buffer .= $indent . '        </div>';
        $buffer .= "\n";
        $buffer .= $indent . '    </article>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

    private function section78700b52d7e6b46b5f7da487ce9d46c0(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{> attachment}}
            ';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                if ($partial = $this->mustache->loadPartial('attachment')) {
                    $buffer .= $partial->renderInternal($context, '                ');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}